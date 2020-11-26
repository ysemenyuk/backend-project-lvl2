install: install-deps

install-deps:
	npm ci

run-json:	
	gendiff file1.json file2.json

run-yml:	
	gendiff file1.yml file2.yml

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test