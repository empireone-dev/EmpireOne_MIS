import React, { useEffect, useRef } from "react";
import JDBlank from "./jd-blank";
import JABlank from "./ja-blank";

const App = ({ setForm, form, data }) => {
    const wysiwygRef = useRef(null);
    function onChangeHandler(e) {
        setForm({
            ...form,
            ja: e.target.innerHTML,
        });
    }
    useEffect(() => {
        setForm({
            ...form,
            ja: data ?? JABlank(),
        });
    }, [data]);
    // Initialize the wysiwyg editor
    useEffect(() => {
        const wysiwyg = wysiwygRef.current;
        const doc = wysiwyg.contentDocument || wysiwyg.contentWindow.document;

        // Create a basic HTML structure for the iframe's document
        doc.open();
        if (data) {
            doc.write(data);
        } else {
            doc.write(JABlank());
        }
        doc.close();

        // Make the body content editable
        doc.body.contentEditable = true;
        doc.body.addEventListener("input", onChangeHandler);
        return () => {
            doc.body.removeEventListener("input", onChangeHandler);
        };
    }, [data]);

    const format = (command, param = null) => {
        const wysiwygDoc =
            wysiwygRef.current.contentDocument ||
            wysiwygRef.current.contentWindow.document;
        wysiwygDoc.execCommand(command, false, param);
    };
    return (
        <div className="">
            <div className="border border-gray-400 overflow-hidden rounded-md">
                <div className="w-full flex border-b border-gray-200 text-xl text-gray-600">
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("bold")}
                    >
                        <i className="mdi mdi-format-bold"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("italic")}
                    >
                        <i className="mdi mdi-format-italic"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 mr-1 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("underline")}
                    >
                        <i className="mdi mdi-format-underline"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-l border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("formatBlock", "P")}
                    >
                        <i className="mdi mdi-format-paragraph"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("formatBlock", "H1")}
                    >
                        <i className="mdi mdi-format-header-1"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("formatBlock", "H2")}
                    >
                        <i className="mdi mdi-format-header-2"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 mr-1 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("formatBlock", "H3")}
                    >
                        <i className="mdi mdi-format-header-3"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-l border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("insertUnorderedList")}
                    >
                        <i className="mdi mdi-format-list-bulleted"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 mr-1 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("insertOrderedList")}
                    >
                        <i className="mdi mdi-format-list-numbered"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-l border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("justifyLeft")}
                    >
                        <i className="mdi mdi-format-align-left"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("justifyCenter")}
                    >
                        <i className="mdi mdi-format-align-center"></i>
                    </button>
                    <button
                        type="button"
                        className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50"
                        onClick={() => format("justifyRight")}
                    >
                        <i className="mdi mdi-format-align-right"></i>
                    </button>
                </div>
                <div className="w-full">
                    <iframe
                        ref={wysiwygRef}
                        className="w-full h-screen overflow-hidden p-3"
                    ></iframe>
                </div>
            </div>

            {/* Buy Me a Beer */}
            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a
                        title="Buy me a beer"
                        href="https://www.buymeacoffee.com/scottwindon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
                    >
                        <img
                            className="object-cover object-center w-full h-full rounded-full"
                            src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
                            alt="Buy me a coffee"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default App;
