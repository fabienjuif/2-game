build:
	@yarn build
	@rm -Rf app
	@mkdir -p app
	@mv ./packages/client/build app/client
	@mv ./packages/server/dist/* app/
	@rm ./app/*.ts
	@cp ./packages/server/package.json app/
	@cp ./yarn.lock app/
	@NODE_ENV=production yarn --cwd app install --production --frozen-lockfile
	@NODE_ENV=production yarn --cwd app add redux --production
	@mkdir -p app/node_modules/@2-game
	@cp -R ./packages/utils app/node_modules/@2-game/utils
	@cp -R ./packages/engine app/node_modules/@2-game/engine
	@cp -R ./packages/astar app/node_modules/@2-game/astar

start: build
	@node app

docker-build: build
	@docker build -t fabienjuif/2-game .

deploy: docker-build
	@docker push fabienjuif/2-game
