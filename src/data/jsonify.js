const parser = require("./csv-parser");
const fs = require("fs");
const path = require("path");

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const combineFilters = (fns) => x => !fns.some(f => f(x));

const combinedFilter = combineFilters([
    ([n]) => n.includes("-"),
    ([n]) => n.includes("."),
    ([n]) => n.length < 2,
    ([n]) => n.toLowerCase() === n,
    ([n]) => n.includes("poika"),
    ([n]) => n.includes("tytär"),
    ([n]) => n.includes("tyttö"),
    ([n]) => /son$/.test(n),
    ([n]) => /dott[ie]r$/.test(n),
]);

const parse = x => compose(
    data => data.sort(),
    data => data.filter(combinedFilter),
    parser.parse,
    data => data.toString(),
    fs.readFileSync,
    path.resolve
)(x);

const mData = parse("./raw/m.csv");
const fData = parse("./raw/f.csv");

const mMap = new Map(mData);
const fMap = new Map(fData);

const mSet = new Set(mData.map(([name]) => name));
const fSet = new Set(fData.map(([name]) => name));

const uSet = new Set(
    [...fSet].filter(name => {
        if (mMap.has(name)) {
            const [mCount, fCount] = [mMap.get(name), fMap.get(name)];
            const [min, max] = [Math.min(mCount, fCount), Math.max(mCount, fCount)];
            const ratio = min / max;
            return ratio > 0.1;
        } else {
            return false;
        }
    })
);

const mExclusive = new Set([...mSet].filter(name => !uSet.has(name)));
const fExclusive = new Set([...fSet].filter(name => !uSet.has(name)));

const arg = process.argv[2].toUpperCase();
switch(arg) {
    case "M": console.log(JSON.stringify([...mExclusive])); break;
    case "F": console.log(JSON.stringify([...fExclusive])); break;
    case "U": console.log(JSON.stringify([...uSet])); break;
}