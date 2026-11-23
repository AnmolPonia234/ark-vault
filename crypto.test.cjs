const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { webcrypto } = require('node:crypto');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const start = html.indexOf('// ----- Shamir secret sharing over GF(256)');
const end = html.indexOf('const hex=', start);
assert.ok(start >= 0 && end > start, 'Shamir implementation marker must exist');
const source = html.slice(start, end);
const { split, combine, mul, dv, EXP, LOG } = new Function('crypto', `${source}; return {split,combine,mul,dv,EXP,LOG};`)(webcrypto);

test('GF(256) exponent table covers all 255 non-zero elements', () => {
  assert.equal(new Set(Array.from(EXP.slice(0, 255))).size, 255);
  for (let a = 1; a < 256; a++) assert.equal(mul(a, dv(1, a)), 1);
});

test('every threshold-sized subset reconstructs the secret for 2-of-3 through 4-of-6', () => {
  const secret = Uint8Array.from({ length: 32 }, (_, i) => (i * 37 + 11) & 255);
  for (const [n, k] of [[3,2],[4,2],[4,3],[5,3],[6,4]]) {
    const shares = split(secret, n, k);
    const choose = (arr, size, at = 0, picked = []) => {
      if (picked.length === size) { assert.deepEqual(combine(picked), secret, `${k}-of-${n} subset`); return; }
      for (let i = at; i <= arr.length - (size - picked.length); i++) choose(arr, size, i + 1, [...picked, arr[i]]);
    };
    choose(shares, k);
  }
});

test('share generation rejects impossible thresholds', () => {
  assert.throws(() => split(new Uint8Array([1]), 3, 4), /threshold/i);
  assert.throws(() => split(new Uint8Array([1]), 1, 1), /threshold/i);
});

test('reconstruction rejects duplicate share coordinates', () => {
  const shares = split(new Uint8Array([1,2,3]), 3, 2);
  assert.throws(() => combine([shares[0], shares[0]]), /duplicate/i);
});
