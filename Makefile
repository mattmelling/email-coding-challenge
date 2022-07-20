.PHONY: test
test:
	npm test -- --coverage
	$(info Coverage report: file://$(shell pwd)/coverage/lcov-report/index.html)

.PHONY: watch
watch:
	npm test -- --coverage --watch

.PHONY: eslint
eslint:
	node_modules/.bin/eslint .

.PHONY: check
check: test eslint

.PHONY: clean
clean:
	rm -rf *.html node_modules .direnv .webpack
