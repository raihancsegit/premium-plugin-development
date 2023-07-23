QTags.addButton('eqt-button1','U','<u>','</u>');
QTags.addButton('eqt-button2','User IP','[userIP]','[/userIP]');
QTags.addButton('eqt-button3','Content Add',eqt_text_con);
function eqt_text_con(){
    var name = prompt('What is your Text?');
    var text = name;
    QTags.insertContent(text);
}

;(function () {

    tinyMCE.PluginManager.add('external-plugins', function (editor, url) {
        //alert(url);
        editor.addButton('buttons-one',{
            //text:'A1',
            icon:"drop",
            //Image:
            onclick:function(){
               editor.insertContent("[userIP]content[/userIP]");
            }
        });
        editor.addButton('buttons-two',{
            text:'A1',
            //icon:"drop",
            //Image:
            onclick:function(){
               editor.insertContent("Hello");
            }
        })
    });

})();