# Sock Shop deploy (Helm + Argo CD)

GitOps manifests for EKS namespaces created by [`branch-protection-infra`](https://github.com/Bui-Hong-Kong/branch-protection-infra):

| Env | Namespace | ECR suffix | Values |
| --- | --- | --- | --- |
| DEV | `sockshop-dev` | `env-1` | `values-dev.yaml` |
| UAT | `sockshop-uat` | `env-2` | `values-uat.yaml` |
| PROD | `sockshop-prod` | `env-3` | `values-prod.yaml` |

## Layout

```text
deploy/
├── helm/sockshop/          # Umbrella Helm chart (apps + DBs + Ingress)
└── argocd/                 # Application CRs (apply into argocd ns)
```

## Preview locally

```bash
helm template sockshop deploy/helm/sockshop \
  -f deploy/helm/sockshop/values.yaml \
  -f deploy/helm/sockshop/values-dev.yaml
```

## Wire Argo CD

1. Ensure platform applied (Argo CD + ALB controller + namespaces).
2. Give Argo access to this GitHub repo (public OK; private → repo credential in Argo).
3. Apply Applications:

```bash
kubectl apply -f deploy/argocd/
```

4. Sync `sockshop-dev` first; open ALB hostname from the Ingress status.

## Image tags

Default tag is `v1.1.0` (from ECR promote). After a new Release + Promote:

1. Bump `global.imageTag` in the matching `values-*.yaml` (or only that service later).
2. Merge to `main` → Argo syncs.

## Security check

| Question | Answer |
| --- | --- |
| Where are secrets stored? | Lab MySQL empty password in values (compose parity). Do not put real secrets here. |
| Who can access? | Cluster RBAC + Argo project; ECR via node IAM. |
| Rotation | Change image tags / rotate DB creds out-of-band for non-lab. |
| Committed to git? | Chart + public image refs only — **no** cloud access keys. |
