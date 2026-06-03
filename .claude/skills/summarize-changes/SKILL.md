---
name: summarize-changes
description: Summarizes uncommitted changes and flags anything risky. Use to have a final look into your latest work before commiting/pushing the code into the github repository, either for ensuring the desired topics were covered or establish the lack of errors.
---

## Instructions:

1. Read the following files to see the current state:
   - src/App.jsx (main component)
   - src/index.css (styling)

2. Summarize the uncommitted changes in each file keeping in mind the following:
   - Individual summary for each file
   - Clear and concise bullet-point structure
   - New functions should have a brief beginner-friendly explanation (1-2 lines)
   - Flag any "risky" changes: removed functions, breaking changes, security issues, or logic that might break existing features

3. Print a concise summary:
   ```
   📝 Uncommitted Changes Summary
   ────────────────────────────────
   src/App.jsx:
   - [bullet list of changes]

   src/index.css:
   - [bullet list of changes]

   Done. Let me know if you'd like a deeper dive into any changes.
   ```

## Notes:
- If no changes exist in a file, note that it's unchanged
- If risky changes are detected, highlight them clearly and ask before making any modifications 