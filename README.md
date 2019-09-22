![travis](https://travis-ci.org/kasselTrankos/functional-pagination.svg?branch=master)

# Functional use for lib

Here is the study and test of two necessary flies logic, apply functional rules and libs to made it more robust.

- pagination: wich is use either rule functor.
- kalendar: Obtains add an week days.
- hierarchy: Parent and children hierarchy.


Uses **ramda-fantasy** to include Either.
Made an approach of **jsverify** for robusts tests.

(moment is only using in test **logic not!**)
must st¡udy how-to publish only one of all monorepos
merge subtree (```git merge --squash -s subtree --no-commit <BRANCH>```) will be necessary to force the merge the use this --allow-unrelated-histories (```git merge --squash -s subtree --no-commit --allow-unrelated-histories <BRANCH>```)

```
git subtree split -P packages/{FOLDER_TO_SPLIT}  -b {BRANCH_NAME}
git checkout {BRANCH_NAME}
git push --set-upstream origin {BRANCH_NAME}
```
