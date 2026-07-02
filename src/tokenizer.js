import { encode, decode } from 'gpt-tokenizer'

function assertString(text) {
  if (typeof text !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof text}`)
  }
}

export function tokenize(text) {
  assertString(text)
  return encode(text).map((id) => ({ id, text: decode([id]) }))
}

export function countTokens(text) {
  assertString(text)
  return encode(text).length
}
