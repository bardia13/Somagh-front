import { Pipe , PipeTransform } from '@angular/core';

@Pipe({name : 'numberWithComma'})
export class NumberWithCommaPipe implements PipeTransform{
    transform(input :string): string{
        // console.log(input[0]);
        
        let output :string = " ";
        let j =1;
        for (let i = input.length -1; i >= 0 ; i-- , j++) {
            
            // console.log ( i + ' : ' +output )
            output = input[i] + output;
            if (j % 3 == 0 && i >= 1 ){
                output = ',' + output;
            }
        }
        // console.log("output number with comma PIPE : " + output);
        return output;
    }
}