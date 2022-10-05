#!/bin/bash

echo "-- Pushing service-a to quay.io"
podman tag service-a:latest quay.io/nlembers/opentour/service-a:1.0
podman push quay.io/nlembers/opentour/service-a:1.0
echo -e "-- Done\n"

echo "-- Pushing service-b to quay.io"
podman tag service-b:latest quay.io/nlembers/opentour/service-b:1.0
podman push quay.io/nlembers/opentour/service-b:1.0
echo -e "-- Done\n"

echo "-- Pushing service-c to quay.io"
podman tag service-c:latest quay.io/nlembers/opentour/service-c:1.0
podman push quay.io/nlembers/opentour/service-c:1.0
echo -e "-- Done"
