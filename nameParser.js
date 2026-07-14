// nameParser.js
// Shared name-parsing logic used by both the admin roster upload
// and the student name-verification form.

// Parses one line of text into { firstName, middleName, lastName }.
// Supports:
//   Format A: "Lastname, Firstname Middle"
//   Format B: "Firstname Middle Lastname"
function parseName(rawLine) {
  const line = (rawLine || "").trim().replace(/\s+/g, " ");
  if (!line) return null;

  if (line.includes(",")) {
    // Format A
    const [lastPart, restPart] = line.split(",").map(s => s.trim());
    const restWords = (restPart || "").split(" ").filter(Boolean);
    return {
      firstName: restWords[0] || "",
      middleName: restWords.slice(1).join(" "),
      lastName: lastPart || ""
    };
  } else {
    // Format B
    const words = line.split(" ").filter(Boolean);
    if (words.length === 1) {
      return { firstName: words[0], middleName: "", lastName: "" };
    }
    return {
      firstName: words[0],
      middleName: words.slice(1, -1).join(" "),
      lastName: words[words.length - 1]
    };
  }
}

// Lowercases, trims, and collapses spaces — so "Reyes" and " reyes  " compare equal
function normalizeForMatch(str) {
  return (str || "").toLowerCase().trim().replace(/\s+/g, " ");
}

// Two parsed names are considered the same person if first + last name match.
// Middle name is deliberately ignored for matching, since students may
// type it differently (or omit it) than however the admin pasted it.
function namesMatch(parsedA, parsedB) {
  return normalizeForMatch(parsedA.firstName) === normalizeForMatch(parsedB.firstName) &&
         normalizeForMatch(parsedA.lastName) === normalizeForMatch(parsedB.lastName);
}