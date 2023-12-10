
function GenerateTest(id)
{
    var iframe = document.createElement('iframe');

    // div tag in which iframe will be added should have id attribute with value myDIV
    document.getElementById("gamesdiv").appendChild(iframe);
    // provide height and width to it
    iframe.setAttribute("style","height:450px;width:400px;");
    iframe.contentWindow.document.open();
    iframe.src = "Games/" + id +"/gamespage.html"
    iframe.contentWindow.document.close();
    iframe.style.borderRadius = "5%";
    iframe.style.margin = "20px";
    document.body.appendChild(iframe);
}

function Generate(id)
{
    GenerateTest(id)
}