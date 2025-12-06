function decodeSantaPin(code: string): string | null {
  const splitCorchetes = (code: string): string[] =>
    code.split(/[\[\]]/).filter((e) => e);
  const operadores = (code: string[]): string[] => {
    let output: string[] = [];
    for (let i = 0; i < code.length; i++) {
      const e = code[i];
      let entreCorch: string = "";

      for (let j = 0; j < e.length; j++) {
        const dig = e[j];

        if (dig === "<") {
          entreCorch += dig;
          break;
        }

        const isNumber = /\d/.test(dig);
        if (isNumber) {
          entreCorch = dig;
        } else if (dig === "-") {
          entreCorch = (Number(entreCorch) - 1).toString();
        } else if (dig === "+") {
          entreCorch = (Number(entreCorch) + 1).toString();
        }
      }

      output.push(entreCorch);
    }

    return output;
  };
  const applyModule10 = (code: string[]): string[] => {
    const modulo = (el: string) => {
      if (el === "<") {
        return el;
      }

      const mod10 = Number(el) % 10;
      return (mod10 === -1 ? 9 : mod10).toString();
    };

    return code.map(modulo);
  };
  const applySpecialOp = (code: string[]) => {
    const out = [];
    for (let i = 0; i < code.length; i++) {
      const element = code[i];
      if (element === "<") {
        code[i] = code[i - 1];
      }
    }

    return code;
  };
  const join = (code: string[]): string => code.join("");

  const checkLength = (output: string): string | null =>
    output.length > 3 ? output : null;

  let output = splitCorchetes(code);
  output = operadores(output);
  output = applySpecialOp(output);
  output = applyModule10(output);

  const temp = checkLength(join(output));

  return temp;
}

console.assert(decodeSantaPin("[1++][2-][3+][<]") === "3144", "3144");
// "3144"

console.assert(decodeSantaPin("[9+][0-][4][<]") === "0944", "0944");
// "0944"

console.assert(decodeSantaPin("[1+][2-]") == null, "null");

// null (solo 2 dígitos)

