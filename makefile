install: install-deps

install-deps:
	npm ci

run:
	gendiff file1.json /backend-project-lvl2/__fixtures__/file2.json

run-plain:	
	gendiff file1.yml file2.yml -f plain

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test