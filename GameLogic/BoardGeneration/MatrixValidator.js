class MatrixValidator {
    validate(size, matrix) {
        let zeroIndex = 0;
        let counter = 0;
        for (let i in matrix) {
            let j = i + 1;

            while (j < matrix.length) {
                if (matrix[j] == 0) {
                    zeroIndex = j;
                } else if (matrix[i] > matrix[j]) {
                    counter++;
                }
                j++;
            }
        } 

        if (size % 2 == 0) {
            return (counter + zeroIndex / size) % 2 == 0;
        }
        
        return counter % 2 == 0;
    }
}