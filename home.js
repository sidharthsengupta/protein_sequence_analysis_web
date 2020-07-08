/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Javascript for homepage
    Sidharth Sengupta
    CS290 Project
    Contains methods that:
    1. Add onclick functions to the buttons
    2. Adds button functions that select and copy the sequence onto the clipboard
    Please widen your window to fit this comment block for optimal viewing. 

-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

// When content is loaded, add onclick functions to the copy buttons in the modals
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mycCopy").onclick = mycCopySeq;
    document.getElementById("p53Copy").onclick = p53CopySeq;
    document.getElementById("atpSynCopy").onclick = atpSynCopySeq;
    document.getElementById("actinCopy").onclick = actinCopySeq;
    document.getElementById("hif1aCopy").onclick = hif1aCopySeq;
    document.getElementById("hgbCopy").onclick = hgbCopySeq;
    document.getElementById("hsp70Copy").onclick = hsp70CopySeq;
    document.getElementById("dnaPolCopy").onclick = dnaPolCopySeq;
    document.getElementById("cftrCopy").onclick = cftrCopySeq;
    }
);

// Each button copies its relative sequence data to the clipboard
function mycCopySeq()	{
    document.getElementById("mycSeq").select();
    document.execCommand("Copy");
}

function p53CopySeq()	{
    document.getElementById("p53Seq").select();
    document.execCommand("Copy");
}

function atpSynCopySeq()	{
    document.getElementById("atpSynSeq").select();
    document.execCommand("Copy");
}

function actinCopySeq()	{
    document.getElementById("actinSeq").select();
    document.execCommand("Copy");
}

function hif1aCopySeq()	{
    document.getElementById("hif1aSeq").select();
    document.execCommand("Copy");
}

function hgbCopySeq()	{
    document.getElementById("hgbSeq").select();
    document.execCommand("Copy");
}

function hsp70CopySeq()	{
    document.getElementById("hsp70Seq").select();
    document.execCommand("Copy");
}

function dnaPolCopySeq()	{
    document.getElementById("dnaPolSeq").select();
    document.execCommand("Copy");
}

function cftrCopySeq()	{
    document.getElementById("cftrSeq").select();
    document.execCommand("Copy");
}
