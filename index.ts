const server = Bun.serve({
  port: process.env.PORT || 3456,
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method === "POST") {
      try {
        const file = await req.formData();
        const data = file.get("file") as Blob;
        const buffer = Buffer.from(await data.arrayBuffer());
        const id = crypto.randomUUID();

        await Bun.write(`upload/${id}`, buffer);

        return Response.json({
            url: `${url.origin}/upload/${id}`
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (req.method === "GET") {
      if (url.pathname === "/") {
        return new Response(`file uploader`);
      }
      const id = url.pathname.split("/").pop();
      const file = Bun.file(`upload/${id}`);
      if (!file.size) {
        return new Response(`File not found`, { status: 404 });
      }
      
      const response = await file.stream();

      setTimeout(() => {
        // one time download - delete file after 5 seconds
        Bun.write(`upload/${id}`, "");
      }, 5000);

      return new Response(response);
    }
    return new Response(`hey!`);
  },
});

console.log(`Listening on http://localhost:${server.port}...`);
