import { eq } from "drizzle-orm";
import { createRoute } from "honox/factory";
import { photosTable } from "../../../../db/schema";

export const POST = createRoute(async (c) => {
  const formData = await c.req.parseBody();
  await c
    .get("db")
    .delete(photosTable)
    .where(eq(photosTable.id, Number(formData.id)));
  return c.redirect("/admin/photos");
});

export default createRoute(async (c) => {
  const photos = await c.get("db").select().from(photosTable);
  return c.render(
    <div>
      <header>
        <h1>写真一覧</h1>
        <a href="/admin/photos/create">写真情報新規登録</a>
      </header>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>撮影場所</th>
            <th>撮影日時</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {photos.map((photo) => (
            <tr key={photo.id}>
              <td>{photo.title}</td>
              <td>{photo.place}</td>
              <td>{new Date(photo.createdAt).toLocaleString("ja-JP")}</td>
              <td class="flex">
                <a href={`/admin/photos/${photo.id}/edit`}>編集</a>
                <form
                  method="post"
                  onsubmit="return confirm('削除してよろしいですか？')"
                >
                  <input type="hidden" name="id" value={photo.id} />
                  <button type="submit">削除</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>,
  );
});
