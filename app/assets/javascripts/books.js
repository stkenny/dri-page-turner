var books = [
    { 
        text            : 'Dublin City Electoral List 1915', 
        url             : '/books/1',
        icon            : 'search',
        height          : 320, 
        width           : 56, 
        font            : "Open Sans",
        "font-size"     : "1.4em",
        "font-weight"   : "normal",
        uppercase       : false,
        texture         : 'canvas' ,
        color           : "rgb(150,20,0)"
    },
];

var randomWords = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Mauris", "porta", "nibh", "et", "dui", "semper", "pharetra", "Donec", "lobortis", "sem", "eget", "lectus", "volutpat", "non", "pharetra", "mauris", "tempor", "Pellentesque", "aliquam", "leo", "in", "sodales", "viverra", "dolor", "neque", "porta", "sem", "sed", "accumsan", "dolor", "dolor", "id", "mauris", "Vivamus", "scelerisque", "est", "id", "mi", "tempor", "sit", "amet", "cursus", "ligula", "dapibus", "Cras", "blandit", "diam", "sed", "aliquet", "aliquet", "Duis", "orci", "lorem", "tempor", "quis", "metus", "ut", "tincidunt", "semper", "mauris", "Aliquam", "blandit", "sapien", "sit", "amet", "ligula", "convallis", "tincidunt", "Aenean", "massa", "erat", "mollis", "vitae", "porttitor", "quis", "elementum", "sit", "amet", "ligula", "Duis", "tristique"];

// An object to store our canvases
var canvases = {};
$(function(){
    // An object to store our images
    var imgs = {
        leather: new Image(),
        canvas: new Image()
    };
    // Counts how many images are loaded.
    var imgsLoaded = 0;
    // Loop over each of the imgs and insert it into the hidden container.
    $.each(imgs, function(index, img){
        $('#hidden-container').append(img);
        // Once the image is loaded we create a canvas the exact size of our images
        img.onload = function() {
            canvases[index] = $("<canvas />");
            canvases[index]
                .attr('width', img.clientWidth)   // Set the height of the canvas to the img height
                .attr('height', img.clientHeight) // same with width.
                .attr('id', index)                // Give it an id according to our texture
                .addClass('texture');             // And a class of 'texture'
            $('body').append(canvases[index]);    // Append it to our document body
            
            // We then draw the image on our canvas
            canvases[index].get(0).getContext('2d').drawImage(img, 0, 0);
            imgsLoaded++;
            if(imgsLoaded === Object.keys(imgs).length){
                addBooks(books);
            }
        }
    });
    
    // And here we set the src attribute of each image
    imgs.leather.src = '/assets/leather.png';
    imgs.canvas.src = '/assets/canvas.png';
});

function addBooks (books) {
    var defaultBook = {
        url             : "", 
        text            : "", 
        font            : "garamond",
        "font-size"     : "1.25em",
        "font-weight"   : "900",
        "font-color"    : "#BBA217",
        uppercase       : true, 
        "icon-placement": "after",
        texture         : 'leather',
        text            : "",
        color           : "#B8293B",
        height          : 200,
        width           : 32
    };
    var totalWidth = 0;
    var docWidth = window.innerWidth;
    $.each(books, function(i, book) {
        // Our default options
        book = $.extend(true, $.extend(true, {}, defaultBook), book);
        $('#bookcase').append(makeBook(book));
        totalWidth += book.width;
    });
}

function makeBook (o){
    // We need a texture to apply to the book.
    if(typeof o.texture === "undefined") return false;
    options = $.extend(true, {}, o);
    options.texture = canvases[options.texture];
    // This gets our container height
    var contHeight = $('#bookcase').height();

    // Here we create our text and book elements.
    if(options.url){
        var $text = $('<a href="' + options.url + '" class="booktext">' + options.text + '</a>');
    } else {
        var $text = $('<span class="booktext">' + options.text + '</span>');
    }
    $text.css("padding", (options.width - $text.width())/2 + "px 12px");
    $text.css("top", "-" + $text.outerHeight()/2 + "px");
    $text.css('font-family', options.font);
    $text.css('font-weight', options["font-weight"]);
    $text.css('font-size', options["font-size"]);
    $text.width(options.height);
    if(typeof options.icon !== "undefined") {
        if(options["icon-placement"].toLowerCase() === "before") {
            $text.prepend("<i class='icon-" + options.icon + " prepend'></i> ");
        } else {
            $text.append(" <i class='icon-" + options.icon + "'></i>");
        }
    }
    if(options.uppercase) {
        $text.css('text-transform', 'uppercase');
    }
    
    var $book = $('<div class="book" />');
    // And we set the book properties as set in options.
    $book.height(options.height);
    $book.width(options.width);
    // Here we use jQuery $.offset() to position our book resting on the 'shelf'
    $book.offset({top: contHeight - options.height});
    
    // Now we create our book texture
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    
    // We set the properties of our canvas according to our options
    canvas.className = 'canvas-texture';
    canvas.width = options.width;
    canvas.height = options.height;
    context.fillStyle = options.color;
    // And then we append it to our book
    $book.append(canvas);
    // Fill with a basic colour
    context.fillRect(0, 0, options.width, options.height);

    var grd = context.createLinearGradient(0.000, options.height/2, options.width, options.height/2);
  
    // Gold Lines
    context.fillStyle = "#bba217";
    context.fillRect(0,15, options.width, 2);
    context.fillRect(0,10, options.width, 2);
    context.fillRect(0,options.height-15, options.width, 2);
    context.fillRect(0,options.height-10, options.width, 2);
    
    // Add colors
    grd.addColorStop(0.000, 'rgba(0, 0, 0, 0.500)');
    grd.addColorStop(0.400, 'rgba(0,0,0,0)');
    grd.addColorStop(1.000, 'rgba(255, 255, 255, 0.200)');
    context.fillStyle = grd;
    context.fillRect(0,0,options.width,options.height);
    
    grd = context.createLinearGradient(options.height/2, 0, options.width/2, options.height);
  
    // Add colors
    grd.addColorStop(0.000, 'rgba(0, 0, 0, 0)');
    grd.addColorStop(0.900, 'rgba(0, 0, 0, 0.400)');
    grd.addColorStop(1.000, 'rgba(0, 0, 0, 0.600)');
    context.fillStyle = grd;
    context.fillRect(0,0,options.width,options.height);
    
    // Overlay our texture onto the book.
    options.texture.get(0).getContext('2d').blendOnto(context,'overlay');
    
    // Add our text to the book.
    $book.append($text);
    
    // Return our book (note this is a jQuery object!)
    return $book;
}
