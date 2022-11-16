/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
  if (kind === "chicken"){
    if(internalTemp >= 165){
      return true
    }
    else{
      return false
    }
  } else if (kind === "beef"){
    if (doneness === "rare"){
      return (internalTemp > 125 && internalTemp <= 138)
    }
    else if (doneness === "medium"){
      return (internalTemp > 138 && internalTemp <= 155)
    }
    else if (doneness === "well"){
      return (internalTemp > 155)
    }
  }
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true