// https://gist.github.com/brucekirkpatrick/7026682
/**
 * $.unserialize
 *
* Takes a string in format "param1=value1&param2=value2" and returns an object { param1: 'value1', param2: 'value2' }. If the "param1" ends with "[]" the param is treated as an array.
*
* Example:
*
* Input:  param1=value1&param2=value2
* Return: { param1 : value1, param2: value2 }
*
* Input:  param1[]=value1&param1[]=value2
* Return: { param1: [ value1, value2 ] }
*
* @todo Support params like "param1[name]=value1" (should return { param1: { name: value1 } })
* Usage example: console.log($.unserialize("one="+escape("& = ?")+"&two="+escape("value1")+"&two="+escape("value2")+"&three[]="+escape("value1")+"&three[]="+escape("value2")));
*/
(function($){
   $.unserialize = function(serializedString){
       var str = decodeURIComponent(serializedString);
       var pairs = str.split('&');
       var obj = {}, p, idx;
       for (var i=0, n=pairs.length; i < n; i++) {
           p = pairs[i].split('=');
           idx = p[0]; 
           if (obj[idx] === undefined) {
               obj[idx] = decodeURIComponent(p[1]).replace ( /\+/g, ' ' );
           }else{
               if (typeof obj[idx] == "string") {
                   obj[idx]=[obj[idx]];
               }
               obj[idx].push(decodeURIComponent(p[1]).replace ( /\+/g, ' ' ));
           }
       }
       return obj;
   };
})(jQuery);