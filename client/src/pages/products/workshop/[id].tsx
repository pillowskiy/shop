import {Meta} from "@containers/Meta";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Header} from "@containers/header/Header";
import {FormInput} from "@components/FormInput";

import {Button} from "@ui/Button";
import {Textarea} from "@ui/Textarea";
import {Label} from "@ui/Label";
import {Switch} from "@ui/Switch";

export default function Page() {

    return (
        <Meta title="Workshop">
            <Header/>
            <SideBar/>
            <Main className="flex flex-col justify-center items-center min-h-screen-64 gap-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pb-32 md:pb-0">
                    <div className="row-span-2 bg-popover border rounded-lg px-4 py-2">
                        <h2 className="text-3xl font-bold mt-2">Product workshop</h2>
                        <hr className="my-2"/>
                        <div>
                            <FormInput className="bg-white" placeholder="Product name"/>
                            <FormInput className="bg-white" placeholder="SKU" disabled/>
                            <FormInput className="bg-white" placeholder="Weight"/>
                            <FormInput className="bg-white" placeholder="Visibility" disabled/>
                            <FormInput className="bg-white" placeholder="Quantity"/>
                            <FormInput className="bg-white" placeholder="Price"/>
                            <FormInput className="bg-white" placeholder="Categories"/>

                            <hr className="my-2"/>

                            <div className="flex items-center space-x-2 mt-2">
                                <Label htmlFor="used">Item used</Label>
                                <Switch id="used"/>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <Label htmlFor="enable-status">The product is damaged</Label>
                                <Switch id="enable-status"/>
                            </div>

                            <div className="mt-4 border-t py-2">
                                <Button>Preview</Button>
                                <Button className="ml-2" variant="destructive">Delete</Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-4 row-span-2">
                        <div className="bg-popover border rounded-lg p-2">
                            <div id="drop-area">
                                <form className="my-form">
                                    <p>Upload multiple files with the file dialog or by dragging and dropping images
                                        onto the dashed region</p>
                                    <input type="file" id="fileElem" multiple accept="image/*"/>
                                    <label className="button" htmlFor="fileElem">Select some files</label>
                                </form>
                            </div>
                        </div>
                        <div className="bg-popover border rounded-lg p-2">
                            <Textarea
                                className="w-full h-full bg-white"
                                placeholder="Product description"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={"fixed bottom-[64px] md:bottom-0 h-auto w-full px-custom md:w-4/6 lg:w-3/6 mb-4"}
                >
                    <div className="flex items-center flex-col md:flex-row shadow-md rounded-lg bg-popover px-4 py-2">
                        <p className="font-medium">Careful — you have unsaved changes!</p>
                        <div className="mt-2 md:mt-0 md:ml-auto">
                            <Button variant="destructive">Reset</Button>
                            <Button className="ml-2">Save</Button>
                        </div>
                    </div>
                </div>
            </Main>
        </Meta>
    );
}