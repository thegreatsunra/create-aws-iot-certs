# create-aws-iot-certs

> Automatically create and associate things, policies, and certs in AWS IoT

## Getting started

1) install [node](https://nodejs.org/en/), [git](https://git-scm.com/downloads), and [yarn](https://yarnpkg.com/lang/en/docs/install/)

2) clone this repo

```bash
git clone https://github.com/thegreatsunra/create-aws-iot-certs.git
cd create-aws-iot-certs
```

3) install dependencies

```bash
yarn
```

4) Set up your `default` AWS [configuration and credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html) file at `~/.aws/credentials`

5) run the app

```bash
npm start
```

6) Certificate files will be created in an `./certs` folder

## License

The MIT License (MIT)

Copyright (c) 2017 Dane Petersen
