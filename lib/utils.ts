import type { StandardSchemaV1 } from "@standard-schema/spec";
import { getDotPath } from "@standard-schema/utils";

export function getFormErrors(issues: readonly StandardSchemaV1.Issue[]) {
  const formErrors: string[] = [];
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of issues) {
    const dotPath = getDotPath(issue);
    if (dotPath) {
      if (fieldErrors[dotPath]) {
        fieldErrors[dotPath].push(issue.message);
      } else {
        fieldErrors[dotPath] = [issue.message];
      }
    } else {
      formErrors.push(issue.message);
    }
  }
  return { formErrors, fieldErrors };
}
