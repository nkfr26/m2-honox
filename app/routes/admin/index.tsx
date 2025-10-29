import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>メニュー画面</h1>
      <a href="/admin/photos">写真一覧</a>
    </div>,
  );
});
