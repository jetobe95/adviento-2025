const log = console.log;
function drawGift(size: number, symbol: string): string {
  if(size < 2) return '';
  let output = `${symbol.repeat(size)}`;
  
  
  for (let i = 0; i < size - 2; i++) {
      output+='\n';
      output += symbol.repeat(1);
      output += ' '.repeat(size  - 2);
      output += symbol.repeat(1);      
    }

  output += `\n${symbol.repeat(size)}`;
  return output+= '';
}


const g1 = drawGift(4, '*')
console.assert(g1 === 
`
****
*  *
*  *
****
`, 
g1
)
/*
 ****
 *  *
 *  *
 ****
 */

log('-'.repeat(10))

const g2 = drawGift(3, '#')
console.log(g2)
/*
###
# #
###
*/

log('-'.repeat(10))

const g3 = drawGift(5, '❤️')
console.log(g3)
/*
--
--
*/

log('-'.repeat(10))

const g4 = drawGift(1, '+')
console.assert(g4 == '',"\"\"")
console.log(g4)
// ""  pobre becario…