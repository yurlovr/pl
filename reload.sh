#!/bin/bash

yarn run build
pm2 reload front
