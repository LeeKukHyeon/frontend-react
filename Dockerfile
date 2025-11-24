# Build stage
FROM node:20-alpine AS build

# 작업 디렉토리 생성
WORKDIR /app

# 의존성 파일 먼저 복사
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install

# 나머지 소스 복사
COPY . .

# 빌드
RUN yarn build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
