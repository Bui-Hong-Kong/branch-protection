{{- define "sockshop.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "sockshop.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- include "sockshop.name" . }}
{{- end }}
{{- end }}

{{- define "sockshop.labels" -}}
app.kubernetes.io/name: {{ include "sockshop.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/part-of: sockshop
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}
{{- end }}

{{- define "sockshop.selectorLabels" -}}
app.kubernetes.io/name: {{ .name }}
app.kubernetes.io/instance: {{ .root.Release.Name }}
app.kubernetes.io/part-of: sockshop
{{- end }}

{{- define "sockshop.appImage" -}}
{{ printf "%s/sockshop-%s-%s:%s" .root.Values.global.ecrRegistry .name .root.Values.global.ecrEnv .root.Values.global.imageTag }}
{{- end }}
