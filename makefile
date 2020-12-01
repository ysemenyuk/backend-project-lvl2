install: install-deps

install-deps:
	npm ci

run:
	gendiff __fixtures__/file1.json /mnt/c/webprojects/backend-project-lvl2/__fixtures__/file2.json

run-plain:	
	gendiff __fixtures__/file1.yml __fixtures__/file2.yml -f plain

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test