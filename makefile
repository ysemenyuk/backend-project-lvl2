install: install-deps

install-deps:
	npm ci

start:
	node start.js

run-stylish:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

run-plain:	
	gendiff __fixtures__/file1.yml __fixtures__/file2.yml -f plain
	
run-json:	
	gendiff __fixtures__/file1.json __fixtures__/file2.json -f json

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test