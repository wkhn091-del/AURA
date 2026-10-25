export type SequenceWorkerRequest = {
  type: "load";
  urls: string[];
};

export type SequenceWorkerResponse =
  | { type: "progress"; loaded: number; total: number }
  | { type: "ready"; bitmaps: ImageBitmap[] }
  | { type: "error"; message: string };

declare const self: Worker;

self.onmessage = async (event: MessageEvent<SequenceWorkerRequest>) => {
  const msg = event.data;
  if (msg.type !== "load") return;

  const bitmaps: ImageBitmap[] = [];
  const total = msg.urls.length;
  const concurrency = 6;
  let cursor = 0;
  let loaded = 0;

  async function loadOne(url: string): Promise<ImageBitmap | null> {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const blob = await res.blob();
      return await createImageBitmap(blob);
    } catch {
      return null;
    }
  }

  async function worker() {
    while (cursor < total) {
      const i = cursor++;
      const bmp = await loadOne(msg.urls[i]!);
      if (bmp) bitmaps[i] = bmp;
      loaded += 1;
      self.postMessage({
        type: "progress",
        loaded,
        total,
      } satisfies SequenceWorkerResponse);
    }
  }

  try {
    await Promise.all(
      Array.from({ length: Math.min(concurrency, total) }, () => worker()),
    );
    self.postMessage({
      type: "ready",
      bitmaps,
    } satisfies SequenceWorkerResponse);
  } catch (e) {
    self.postMessage({
      type: "error",
      message: e instanceof Error ? e.message : "Sequence load failed",
    } satisfies SequenceWorkerResponse);
  }
};

export {};
