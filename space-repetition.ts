import { binarySearch } from "./utils/binary-search";
import { getRandomRangedNumber } from "./utils/get-random-ranged-number";

export type WeightedItem<T> = T & { weight: number };

type SpaceRepetitionAlgorithmProps<T> = {
  items: T[];
  dateAttributeKey: keyof T;
  debug?: boolean;
};

/**
 * The spaced repetition algorithm is a method of reviewing material at increasingly
 * longer intervals to exploit the psychological spacing effect. This algorithm is
 * used to review material at increasingly longer intervals to maximize retention.
 *
 * @param {T[]} items - The array of items to review. Each item must have the
 * key specified in the `dateAttributeKey` property.
 * @param {string} dateAttributeKey - The key of the date attribute in each item.
 * @param {boolean} [debug=false] - Whether or not to log debug information to the
 * console.
 * @returns {WeightedItem<T>[]} The array of items with weights. The weights are minutes
 * calculated as the difference between the furthest date in the array and the
 * item's date. The closest the date is to the current date, the higher the weight.
 *  Items are sorted DESC by weight.
 */
export default function spaceRepetitionAlgorithm<
  T extends { [key: string]: string | Date | number }
>({
  items,
  dateAttributeKey,
  debug = false,
}: SpaceRepetitionAlgorithmProps<T>) {
  if (items.length === 0) {
    console.error("[Spaced Repetition Algorithm] - No items in the array");
  }

  let min: number | null = null;
  let max: number | null = null;

  const culmulativeWeights: number[] = [];
  const mappedItems: WeightedItem<T>[] = items.map((item: T) => {
    const dateInMinutes = Math.round(
      (new Date(item[dateAttributeKey]).getTime() - Date.now()) / 1000 / 60
    );

    if (min === null) {
      min = dateInMinutes;
    } else if (dateInMinutes < min) {
      min = dateInMinutes;
    }

    if (max === null) {
      max = dateInMinutes;
    } else if (dateInMinutes > max) {
      max = dateInMinutes;
    }

    return { ...item, weight: dateInMinutes };
  });

  if (min === null || max === null) {
    console.error("[Spaced Repetition Algorithm] - No dates in the array");
    return;
  }

  const reversedWeights: WeightedItem<T>[] = mappedItems.map((item) => {
    return {
      ...item,
      weight: max! - item.weight,
    };
  });

  reversedWeights.map((item: WeightedItem<T>, index: number) => {
    if (index === 0) {
      culmulativeWeights.push(item.weight);
      return;
    }

    culmulativeWeights.push(culmulativeWeights[index - 1] + item.weight);
    return;
  });

  reversedWeights.sort((a, b) => b.weight - a.weight);

  const summedSeconds = culmulativeWeights[culmulativeWeights.length - 1];
  const randomNumber = getRandomRangedNumber(0, summedSeconds);
  const foundIndex = binarySearch(culmulativeWeights, randomNumber);

  if (debug) {
    console.log(
      `[Spaced Repetition Algorithm] - Random Number: ${randomNumber}`
    );
    console.log(
      `[Spaced Repetition Algorithm] - Summed Weights: ${summedSeconds}`
    );
    console.log(`[Spaced Repetition Algorithm] - Min: ${min} - Max: ${max}`);
    console.log(
      `[Spaced Repetition Algorithm] - Items: ${JSON.stringify(
        reversedWeights
      )}`
    );
    console.log(
      `[Spaced Repetition Algorithm] - Culmulative Weights: ${JSON.stringify(
        culmulativeWeights
      )}`
    );
    console.log(
      `[Spaced Repetition Algorithm] - Index: ${foundIndex} - Item: ${JSON.stringify(
        reversedWeights[foundIndex]
      )}`
    );
  }

  if (foundIndex === -1) {
    console.error(
      `[Spaced Repetition Algorithm] - No item found for random number: ${randomNumber}`
    );
    return;
  }

  return reversedWeights;
}
