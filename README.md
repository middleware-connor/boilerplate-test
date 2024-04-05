# NestJS Boilerplate 프로젝트

## 시작하기

**_프로젝트 구축 시 단 한번만 아래 코드를 실행_**

```sh
npm install # 패키지 설치
npm run build # 컴파일 타입스크립트 (필수)
```

로컬환경에서 실행

```sh
npm run watch # 백그라운드에서 실행
```

```sh
npm run start:local
```

curl

```sh
curl --location 'http://localhost:3000/api/v1/health'
```

## 특징

### 1. 디렉토리 구조

파일 이름은 `kebab-case` 로 통일한다.

- `dist/`
- `env/`
  - `.env.dev`
  - `.env.prod`
- `src/`
  - `common/`
    - `<file-name>.ts`
  - `controllers/` [Presentation Layer]
    - `<controller-name>/`
      - `<controller-name>.controller.ts`
      - `<controller-name>.controller.module.ts`
      - `<controller-name>.controller.dto.ts`
  - `repositories/` [Persistence Layer]
    - `<repository-name>/`
      - `<repository-name>.repository.ts`
      - `<repository-name>.repository.entity.ts`
        - RDB 를 사용할 경우 테이블을 나타낸다.
        - NoSQL 을 사용할 경우 Collection 을 나타낸다.
      - `<repository-name>.repository.module.ts`
  - `services/` [Business Layer]
    - `<service-name>/`
      - `<service-name>.service.ts`
      - `<service-name>.service.module.ts`
  - `framework/`
    - `decorators/`
    - `interceptors/`
    - `guards/`
      - `<guard-name>.guard.provider.ts`
    - `middlewares/`
      - `<middleware-name>.middleware.provider.ts`
    - `interceptors/`
      - `<interceptor-name>.interceptor.ts`
  - `domain/`
    - `<domain-name>/`
      - `<domain-name>.vo.ts`
      - `<domain-name>.entity.ts`
      - `<domain-name>.mapper.ts`
      - `<domain-name>.types.ts`
- `test/`
  - `integration.test.ts`

### 2. 내장 기능

- 환경변수 관리 - [@nestjs/config](https://github.com/nestjs/config)
- AOP - [Interceptors](https://docs.nestjs.com/interceptors)
- 비밀번호 암호화 등 유틸함수
- 커스텀 타입
- 커스텀 로깅 미들웨어 - [Middleware](https://docs.nestjs.com/middleware)
- Formatting & Linting - [Prettier](https://prettier.io/docs/en/) [ESLint](https://eslint.org/docs/latest/use/getting-started)
- CI 구축 - [GitHub Actions](https://docs.github.com/ko/actions/quickstart)
  - Docker Container Image
  - NPM SDK Package

### 3. 체크리스트

IDE의 모두 바꾸기 기능을 활용해 <br>
`boilerplate-test` 를 모두 레포지토리 명으로 수정해 줍니다.

...

### 4. 버전

- Typescript: 5.3.2
