# Open Tour 2022 - Service Mesh

## Projects

Deploy projects service-a, service-b, service-c.

Call service-a to see the call hierarchy. service-c has endpoints to throw errors ('/misbehave', '/behave').

Projects can be run via docker ('podman-compose up --build') or deployed to OpenShift Kubernetes (see Deployment files in folder 'kubernetes').


## Presentation

Browser based presentation via demoit

https://github.com/dgageot/demoit

Install demoit and run 'demoit' in folder 'presentation'.

## OpenShift Service Mesh preparation

See https://docs.openshift.com/container-platform/4.11/service_mesh/v2x/installing-ossm.html

Install in order:

* **OpenShift Elasticsearch**  
Namespace: openshift-operators-redhat
* **Red Hat OpenShift distributed tracing platform**  
Namespace: openshift-distributed-tracing
* **Kiali**  
Namespace: openshift-operators
* **Red Hat OpenShift Service Mesh**  
Namespace: openshift-operators

Then:

* Create "istio-system" namespace
* Install ServiceMeshControlPlane (istio/controlplane.yml)
* Create ServiceMeshMemberRoll (istio/memberroll.yml)
