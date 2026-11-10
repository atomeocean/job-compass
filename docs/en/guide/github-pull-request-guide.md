---
title: Opening a Pull Request on GitHub
description: How to open a pull request from the GitHub website, including committing your changes and setting reviewers and assignees.
outline: deep
createdDate: 2025-03-08
lastUpdated: 2026-11-10
---
# Opening a Pull Request (PR) on the GitHub Website

This guide explains how to get changes you made on the GitHub website merged into the target repository.

## Commit your changes

1. When you have finished editing the file, click the **Commit changes...** button in the top right of the window.
2. In the first field (Commit message), enter a short commit message, for example "Add github-guide.md".
3. In the second field, add a longer description (optional).
4. Choose the branch to commit to:
   - If you haven't created a branch for this change yet, select **Create a new branch for this commit and start a pull request** and enter a branch name in the field below. Branch names are usually lowercase letters joined by hyphens ('-').
   - If you are editing on an existing branch, select **Commit directly to the your-branch-name branch**.
5. Click **Propose changes**. You are taken to the page for opening a pull request.

## Open the pull request (PR)

1. Fill in the pull request details
    - Enter a title for the PR.
    - In the description, explain your changes (for example, why the change is needed and what exactly changed).
2. Set a reviewer
    - Under Reviewers in the right-hand sidebar, click the **gear** ⚙️ icon and choose a user to review this PR.
3. Set assignees
    - Under Assignees in the right-hand sidebar, click the **gear** ⚙️ icon and choose the user responsible for this PR. Usually you just click **assign yourself**.
4. Link other items (optional)
    - If needed, link an issue or add labels, projects and so on from the right-hand sidebar.
5. Create the pull request
    - Once everything looks right, click the **Create pull request** button at the bottom.
    - Your PR is created and appears under the Pull requests tab at the top of the repository.
6. Wait for review
    - When the PR is created, GitHub notifies the reviewers and collaborators.
    - They may suggest changes, or approve the PR directly.
7. Merge the pull request
    - After a reviewer approves the PR, choose **Squash and merge** from the button at the bottom and click it to merge.
8. Delete the branch
    - After the PR is merged, click **Delete branch** to remove the branch.
