interface Gift {
    toy: string, 
    quantity: number 
}
function manufactureGifts(
  giftsToProduce: Array<Gift>
): string[] {

  const onlyManufacturable = (gift:Gift) => gift.quantity > 0;
  const repeatToy = (gift: Gift) => Array(gift.quantity).fill(gift.toy)
  return [
    ...giftsToProduce
    .filter(onlyManufacturable)
    .flatMap(repeatToy)
  ];

}



console.log(manufactureGifts([{ toy: 'car', quantity: 3 }, { toy: 'doll', quantity: 1 }, { toy: 'ball', quantity: 2 }]))
/*
    [
    "car",
    "doll",
    "doll",
    "car",
    "car",
    "car"
    ]
 */