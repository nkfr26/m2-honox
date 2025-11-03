import { Hono } from "hono";
import { createAction } from "hono/action";
import * as v from "valibot";
import { photosTable } from "../../../../../db/schema";
import { getFormErrors } from "../../../../../lib/utils";

const app = new Hono();

const schema = v.object({
  title: v.pipe(v.string(), v.minLength(1)),
  place: v.pipe(v.string(), v.minLength(1)),
  url: v.pipe(v.string(), v.minLength(1), v.url()),
  createdAt: v.pipe(
    v.string(),
    v.minLength(1),
    v.transform((val) => new Date(val)),
  ),
});

const [action, Component] = createAction(app, async (data, c) => {
  const result = await schema["~standard"].validate(data);

  if (!result.issues) {
    await c.var.db.insert(photosTable).values({
      ...result.value,
    });
    return c.redirect("/admin/photos");
  }

  const error = getFormErrors(result.issues);

  return (
    <>
      <div>
        <label for="title">タイトル</label>
        <input type="text" name="title" value={data?.title} required />
        {error.fieldErrors.title && <p>{error.fieldErrors.title[0]}</p>}
      </div>
      <div>
        <label for="place">撮影場所</label>
        <input type="text" name="place" value={data?.place} required />
        {error.fieldErrors.place && <p>{error.fieldErrors.place[0]}</p>}
      </div>
      <div>
        <label for="url">URL</label>
        <input type="url" name="url" value={data?.url} required />
        {error.fieldErrors.url && <p>{error.fieldErrors.url[0]}</p>}
      </div>
      <div>
        <label for="createdAt">撮影日時</label>
        <input
          type="datetime-local"
          name="createdAt"
          value={data?.createdAt}
          required
        />
        {error.fieldErrors.createdAt && <p>{error.fieldErrors.createdAt[0]}</p>}
      </div>
      <button type="submit">登録</button>
      <a href="/admin/photos">戻る</a>
    </>
  );
});

app.get((c) => {
  return c.render(
    <>
      <h1>写真情報新規登録</h1>
      <form action={action}>
        <Component />
      </form>
    </>,
  );
});

export default app;
