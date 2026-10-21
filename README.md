# Practice: branch protection trên main

Developer pull `main`, tạo nhánh trong cùng repo, mở pull request. `main` không nhận push thẳng.

## Merge khi nào

- PR vào `main`, nhánh đã cập nhật với `main` (merge queue / up to date nếu ruleset bật).
- Workflow **2. Pre-merge checks** pass trên PR: lint + build cho Java, Go, JavaScript (chạy hết trên mọi PR).

App Sock Shop: `backend/<service>/` (carts, catalogue, orders, payment, shipping, user) và `frontend/`. Mỗi service có semver riêng (`carts-vX.Y.Z`, …).

Ruleset: xem `.github/ruleset-main.json` (`protect-main`). Không bắt CodeQL.

## Ruleset `protect-main` (tóm tắt)

| Rule | Tác dụng |
| --- | --- |
| Restrict deletions / Block force pushes | Bảo vệ `main` |
| Require a pull request | Không push thẳng lên `main` |
| Merge queue | Merge qua queue khi check xanh |

Bypass: user trong `bypass_actors` (lab).

## Secret

- Push protection / secret scanning: bật trong **Settings → Advanced Security** nếu dùng (không nằm trong ruleset).

## Việc developer làm mỗi lần

```bash
git checkout main
git pull origin main
git checkout -b feature/ten-nhanh
git push -u origin HEAD
```

Mở PR vào `main`. Khi `main` có commit mới: **Update branch** trên PR, hoặc merge `origin/main` rồi push.

## Case để tập

1. Ruleset active, `git push origin main` → bị từ chối (trừ bypass).
2. Commit AWS access key rồi push → push protection từ chối (nếu bật).
3. Pre-merge fail → không merge được qua queue.

## Release & images

- Conventional Commits trên `main` → **3. Release** tạo tag `<service>-vX.Y.Z`.
- **4. Promote image to DEV** → ECR `sockshop-<service>-env-1`.
- **5. Promote image to UAT** → `env-2` (Environment `env-2`).
- **6. Promote image to PROD** → `env-3` (Environment `prod`).

## Deploy (EKS / Argo CD)

Helm chart + Argo Applications: see [`deploy/README.md`](deploy/README.md).
