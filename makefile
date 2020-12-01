install: install-deps

install-deps:
	npm ci

run:
	gendiff -h	
	gendiff file11.json file22.json

run-plain:	
	gendiff file11.yml file22.yml -f plain

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test