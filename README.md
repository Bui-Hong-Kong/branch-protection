# Practice: branch protection trên main

Developer pull `main`, tạo nhánh trong cùng repo, rồi mở pull request. `main` không nhận push thẳng.

Merge xảy ra khi đủ ba điều kiện:

- CodeQL đã có kết quả cho commit của PR và cho `main`.
- Không có security alert mức high hoặc critical, và không có alert mức Error.
- Nhánh đã chứa mọi commit mới của `main`, và check `CodeQL` pass.

Ruleset không yêu cầu approving review, nên một người vẫn merge được sau khi các điều kiện trên thỏa.

Các bước bên dưới là cho repo **public**. Tài khoản Free có ruleset, secret scanning, push protection, và CodeQL default setup trên repo public. Repo private làm theo mục [Repo private](#repo-private).

## Repo private

Lab này trên repo private cần một **organization** dùng GitHub Team hoặc GitHub Enterprise Cloud. Tài khoản cá nhân không mua được GitHub Code Security và GitHub Secret Protection, nên repo private của tài khoản cá nhân không có CodeQL và secret scanning.

| Tài khoản giữ repo | Private repo làm được gì |
| --- | --- |
| Cá nhân, Free | Không có branch protection, không có ruleset |
| Cá nhân, Pro | Classic branch protection: bắt PR, chặn push thẳng, chặn force-push, chặn xóa nhánh. Không có ruleset, CodeQL, secret scanning. "Require branches to be up to date" không có hiệu lực vì không có check `CodeQL` để bắt buộc |
| Organization, Team hoặc Enterprise | Đủ lab, sau khi organization owner bật hai gói trả phí trên đúng repo này |

Organization owner bật **GitHub Code Security** và **GitHub Secret Protection** cho repo. GitHub tính phí theo từng người đã commit vào repo private đó trong 90 ngày gần nhất. Hai gói nằm ở billing của organization, không ghi vào git.

Sau khi hai gói đã bật trên repo, làm tiếp các bước public ở dưới, với ba điểm riêng:

1. **Settings → Advanced Security**: bật Secret scanning và Push protection. Repo private không tự bật hai mục này.
2. Push protection trên tài khoản cá nhân chỉ chặn secret khi push lên repo public. Repo private dùng push protection của chính repo.
3. CodeQL default setup dùng phút GitHub Actions của gói private. Actions của repo phải đang bật.

Ruleset vẫn tắt cho đến khi phân tích CodeQL trên `main` đã xong và PR trong cùng repo hiện check tên `CodeQL`. File `.github/ruleset-main.json` dùng được nguyên sau bước đó.

## Bật trên GitHub, theo thứ tự

Ruleset phải tắt trong suốt các bước 1–6. Bật sớm thì check `CodeQL` chưa tồn tại và không ai merge được.

1. Push repo này lên `main`.
2. Thêm một file thuộc ngôn ngữ CodeQL hỗ trợ (JavaScript, TypeScript, Python, Go, Java, …) **thẳng lên `main`**. Default setup không chạy scan khi repo chỉ có Markdown. Ngôn ngữ phải có trên nhánh mặc định thì CodeQL mới bắt đầu phân tích. Pull request đầu tiên chưa tạo được check.
3. Bật GitHub Actions cho repo nếu tab Actions đang tắt.
4. **Settings → Advanced Security** (mục Security and quality ở sidebar). Trong **Code Security**, cạnh **CodeQL analysis**, chọn **Set up → Default → Enable CodeQL**.
5. Đợi lần phân tích CodeQL trên `main` chạy xong.
6. Tạo nhánh trong **cùng repo** (không dùng fork), mở PR vào `main`. Trên PR, đọc đúng tên check. Default setup tạo check tên `CodeQL`.
7. **Settings → Rules → Rulesets → New branch ruleset**, target `main`, hoặc tạo ruleset từ `.github/ruleset-main.json`. Trong file đó, `context` phải trùng tên check ở bước 6. Sai tên thì mọi PR đứng ở "Expected — waiting for status to be reported".

CodeQL default setup không chạy trên pull request từ fork. Check `CodeQL` sẽ không xuất hiện và ruleset giữ PR đó mãi.

## Ruleset `protect-main`

| Rule | Tác dụng |
| --- | --- |
| Restrict deletions | Không xóa `main` |
| Block force pushes | Không force-push lên `main` |
| Require a pull request | Mọi thay đổi vào `main` đi qua PR. Push thẳng bị từ chối, kể cả admin, vì `bypass_actors` để trống |
| Require code scanning results, tool CodeQL | Chặn merge khi security alert là high hoặc critical, khi alert có mức Error, khi scan chưa xong, hoặc khi `main` và commit của PR chưa có kết quả CodeQL. Alert security medium/low, warning, và note không chặn |
| Required status check `CodeQL` | Phân tích CodeQL phải kết thúc với trạng thái pass |
| Require branches to be up to date | Nhánh còn thiếu commit của `main` thì nút merge khóa. Trên PR bấm **Update branch**. CodeQL chạy lại trên commit đã gồm latest `main` |

Hai rule CodeQL làm hai việc khác nhau. Rule code scanning nhìn **mức alert**. Required status check nhìn **lần chạy đã pass chưa**, và là điều kiện để GitHub khóa nhánh cũ: tùy chọn up to date chỉ có hiệu lực khi có ít nhất một required status check. Check `CodeQL` có thể pass trong khi rule code scanning vẫn chặn vì còn alert vượt ngưỡng.

Trong `.github/ruleset-main.json`, "Require branches to be up to date" là trường `strict_required_status_checks_policy`.

## Secret

Secret scanning trên repo public chạy sẵn và tạo alert sau khi secret đã vào git. Push protection là cửa chặn trước lúc push.

- **Push protection for users** bật mặc định trên tài khoản và chặn push secret lên repo public.
- **Push protection** của repo bật trong **Settings → Advanced Security**, mục Secret Protection. Cửa này áp cho mọi người có quyền ghi.

Push protection chỉ nhận các loại secret GitHub đã có pattern (ví dụ AWS access key id). Chuỗi tự đặt như `password = "abc"` đi qua.

Người có quyền ghi có thể bypass push protection bằng cách khai lý do. Muốn chặn bypass thì bật delegated bypass trong cùng trang Secret Protection.

Hai mục này không nằm trong ruleset.

## Việc developer làm mỗi lần

```bash
git checkout main
git pull origin main
git checkout -b feature/ten-nhanh
git push -u origin HEAD
```

Mở PR từ nhánh đó vào `main`. Khi `main` có commit mới, bấm **Update branch** trên PR, hoặc:

```bash
git fetch origin main
git merge origin/main
git push
```

## Case để tập

1. Ruleset đang active, `git push origin main` → GitHub từ chối.
2. Commit một AWS access key id rồi push → push protection từ chối push.
3. PR có security alert high hoặc critical → rule code scanning chặn merge, kể cả khi check `CodeQL` vẫn pass.
4. Có commit mới trên `main` mà nhánh chưa update → nút merge khóa đến khi **Update branch** xong và check `CodeQL` pass trên commit mới.
