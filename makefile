install: install-deps

install-deps:
	npm ci

run:	
	gendiff file1.json /mnt/c/webprojects/backend-project-lvl2/__fixtures__/file2.json

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test