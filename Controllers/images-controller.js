Photos = new FS.Collection("photos", {
    stores: [new FS.Store.FileSystem("photos", {
        path: "~/photos"
    })]
});
