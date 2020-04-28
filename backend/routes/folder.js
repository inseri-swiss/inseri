const express = require('express');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const PageSet = require('../models/page-set');
const Folder = require('../models/folder');
const FileModel=require('..//models/files');
const router = express.Router();

//creating a new folder --> mainFolderId should be null if it is on the root folder otherwise it is the value of the Parent folder ID
//folder CRUD operations.
router.post('/:mainFolderId',checkAuth, (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  let newFolder;
  Folder.find({title: req.body.title, owner:req.userData.userId})
    .then((result) => {
      // Checks if other owner has the same folder name
      if (result.length > 0 && req.params.mainFolderId ==='-1'){
        return res.status(409).json({
          message: 'Folder already exists!'
        });
      }
      else if(req.params.mainFolderId !== '-1') {
        Folder.find({title: req.body.title, owner: req.userData.userId, hasParent: req.params.mainFolderId})
          .then((result) => {
            // Checks if other owner has sub folder with the same name for the  current parent folder
            if (result.length > 0) {
              return res.status(409).json({
                message: 'Subfolder already exists for the same main folder!'
              });
            }
          });
      }
      if(req.params.mainFolderId==='-1') {
        newFolder = new Folder({
        title: req.body.title,
        owner: req.userData.userId
        });
      }
      else {
        newFolder = new Folder({
          title: req.body.title,
          owner: req.userData.userId,
          hasParent: req.params.mainFolderId
        });
      }
      console.log(req.params.mainFolderId);
      newFolder.save()
        .then (resultQuery => {
          console.log("new Folder: "+ newFolder._id);
            res.status(201).json({
              message: 'Folder was created successfully',
              folder: newFolder
            });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'Creating Folder failed',
            error: error
          })
        });
    });
});

//Fetching all folders of a user, if the folder is in the root then the mainFolderId is -1
router.get('/:mainFolderId', checkAuth, (req, res, next) => {
  if(req.params.mainFolderId ==='-1'){
    Folder.find({owner: req.userData.userId, hasParent : { $exists: false }})
      .then(folders => {
        let message;
        if (folders.length === 0) {
          message = 'No folders were found'
        } else {
          message = 'All folders were found'
        }
        res.status(200).json({
          message: message,
          folders: folders
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching all folders failed',
          error: error
        })
      })
  }
  else {
    Folder.find({owner: req.userData.userId, hasParent: req.params.mainFolderId})
      .then(folders => {
        let message;
        if (folders.length === 0) {
          message = 'No folders were found'
        } else {
          message = 'All folders were found'
        }
        res.status(200).json({
          message: message,
          folders: folders
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching all folders failed',
          error: error
        })
      })
  }
});

router.post('/update/title/:folderId',checkAuth, (req, res, next) => {
  console.log(req.userData.userId);
  Folder.updateOne({$and:[
        {owner: req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$set: {title: req.body.title}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});


///add and delete an existing PageSet and create a new PageSet in a folder
router.post('/update/addPageSet/:folderId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner:  req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$addToSet: {hasPageSets: {_id: req.body.pageSet.id, title: req.body.pageSet.title, actionId: req.body.pageSet.actionId}}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

//return an array of PageSetIds
router.get('/getPageSets/:folderId', checkAuth, (req, res, next) => {
    Folder.find({owner: req.userData.userId, _id: req.params.folderId},{hasPageSets:1,_id:0})
      .then(pageSets => {
        let message;
        if (pageSets.length === 0) {
          message = 'The Folder has no PageSets'
        } else {
          message = 'All PageSets were found'
        }
       // console.log("pageSet from route"); console.log(pageSets[0].hasPageSets);
        res.status(200).json({
          message: message,
          pageSets: pageSets[0].hasPageSets
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching all PageSets failed',
          error: error
        })
      })
  });

router.post('/update/removePageSet/:folderId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
            {owner: req.userData.userId},
            {_id: req.params.folderId}
          ]},
        {$pull: {hasPageSets: {_id: req.body.pageSet.id, title: req.body.pageSet.title, actionId: req.body.pageSet.actionId}}})
        .then((updatedDocument) => {
          if (updatedDocument.n === 0) {
            res.status(400).json({
              message: 'Folder cannot be updated.'
            });
          } else {
            return res.status(200).json({
              message: 'Folder has been updated successfully',
              updatedDocument: updatedDocument
            });
          }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

///add, update and delete Query
router.post('/update/addQuery/:folderId&:queryId',checkAuth, (req, res, next) => {
  console.log(req.userData.userId+'\n'+req.params.folderId+'\n'+req.params.queryId+'\n'+req.body.queryTitle);
  Folder.updateOne({$and:[
        {owner:  req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$addToSet: {hasQueries: {_id: req.params.queryId, title: req.body.queryTitle}}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

//return an array of Queries
router.get('/getQueries/:folderId', checkAuth, (req, res, next) => {
  console.log(req.userData.userId+'\n'+req.params.folderId+'\n');
  Folder.find({owner: req.userData.userId, _id: req.params.folderId},{hasQueries:1,_id:0})
    .then(results => {
      let message;
      console.log(results[0].hasQueries);
      if (results.length === 0) {
        message = 'The Folder has no Queries'
      } else {
        message = 'All Queries were found'
      }
      console.log(message);
      res.status(200).json({
        message: message,
        queries: results[0].hasQueries
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching all queries failed',
        error: error
      })
    })
});

router.post('/update/removeQuery/:folderId&:queryId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner: req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$pull: {hasQueries: {_id: req.params.queryId, title: req.body.queryTitle}}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

///add and delete Page
/*router.post('/update/addPage/:folderId&:pageId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner:  req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$addToSet: {hasPages: req.params.pageId}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

//return an array of PagesIds
router.get('getPages/:folderId', checkAuth, (req, res, next) => {
  Folder.find({owner: req.userData.userId, _id: req.params.folderId},{hasPages:1,_id:0})
    .then(pages => {
      let message;
      if (pages.length === 0) {
        message = 'The Folder has no Pages'
      } else {
        message = 'All Pages were found'
      }
      res.status(200).json({
        message: message,
        pages: pages[0]
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching all Pages failed',
        error: error
      })
    })
});

router.post('/update/removePage/:folderId&:pageId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner: req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$pull: {hasPages: req.params.pageId}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});
*/
///add and delete Files
router.post('/update/addFile/:folderId&:fileId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner:  req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$addToSet: {hasFiles: req.params.fileId}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

//return an array of Files
/*router.get('getFiles/:folderId', checkAuth, (req, res, next) => {
  Folder.find({owner: req.userData.userId, _id: req.params.folderId},{hasFiles:1,_id:0})
    .then(files => {
      let message;
      if (files.length === 0) {
        message = 'The Folder has no Files'
      } else {
        message = 'All Files were found'
      }
      res.status(200).json({
        message: message,
        files: files[0]
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching all files failed',
        error: error
      })
    })
});*/

router.post('/update/removeFile/:folderId&:fileId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner: req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$pull: {hasFiles: req.params.fileId}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

router.post('/delete/:folderId',checkAuth, (req, res, next) => {
  Folder.deleteOne({
    owner: req.userData.userId,
    _id: req.params.folderId
  })
    .then((deletedFolder) => {
      if (deletedFolder.n === 0) {
        return res.status(400).json({
          message: 'Folder cannot be deleted',
          deletedGroup:deletedFolder
        });
      } else {
        res.status(200).json({
          message: 'Folder has been deleted successfully.'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting Folder failed',
        error: error
      })
    });
});
//upload a file to a folder
router.post('/update/uploadFile/:folderId&:fileId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner:  req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$addToSet: {hasFiles: req.params.fileId}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

router.get('/getAllFilesAndFolders/:folderId', checkAuth, (req, res, next) => {
  console.log(req.userData.userId+'\n'+req.params.folderId+'\n');
  let parentId=req.params.folderId;
  let targetFolders=[];
  Folder.find({owner: req.userData.userId})
    .then(AllFolders =>
    {
      let message;
      if (AllFolders.length === 0) {
        message = 'No folders were found'
      }
      else {
        let tempFolderMap = new Map();
        AllFolders.forEach(folder=>{ tempFolderMap.set(folder._id.toHexString(),folder)});
        for(let i=0; i<AllFolders.length;i++)
        {
          getFolderHierarchy(AllFolders[i]._id, parentId, targetFolders,tempFolderMap );
        }
        const newFoldersArrayTemp=targetFolders.map((obj)=>({...obj._doc,['files']:[]}));
        targetFolders=newFoldersArrayTemp;

        const targetFolderIds=targetFolders.map((obj)=>obj._id);
        //console.log("targetFolderIds", targetFolderIds)
          message = 'All folders were found'

          getAllFiles(req.userData.userId,res,targetFolderIds);
        //console.log("targetFolders after get All Files: ")
        //console.log(targetFolders);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Fetching all folders failed',
        error: error
      })
    });
});
function getFolder ( id, map)
{
  return map.get(id.toHexString())
}
function checkFolderHierarchy(folder_id, targetParent_id, folderMap)
{
  if(folder_id  == targetParent_id)
  {
    return true;
  }
  else if(!folder_id) {
    return false;
  }
  else
  {
    let currentFolder=getFolder(folder_id, folderMap);
    if(!currentFolder) {
      return false;
    }
    let parent_id= currentFolder.hasParent;
    return checkFolderHierarchy(parent_id, targetParent_id, folderMap);
  }
}
function getFolderHierarchy(folder_id, targetParent_id, result, folderMap)
{
  let currentFolder=getFolder(folder_id, folderMap);
  if(checkFolderHierarchy(folder_id,targetParent_id, folderMap))
  {
    let folder = getFolder(folder_id,folderMap);
    result.push(folder);
  }
}

 function getAllFiles(owner, res, targetFolderIds){
  let sortedFiles=[];
  let extensions=[];
  Folder.find({owner: owner, _id:{$in: targetFolderIds}}, {hasFiles: 1, title: 1})
    .then(folderDetails => {
      let message;
      if (folderDetails.length === 0) {
        message = 'The Folder has no files'
        console.log(message);
      } else {
        const newFoldersArrayTemp=folderDetails.map((obj)=>({...obj._doc,['files']:[]}));
        folderDetails=newFoldersArrayTemp;
        console.log("folderDetails at the beginning after adding empty files field: ")
        console.log(folderDetails)
        const newFilesArrayTemp=folderDetails.map((obj)=>(obj.hasFiles));
        let fileIds=newFilesArrayTemp.flat();
        console.log("fileIds: ",fileIds);
        //for(let f=0;f<folderDetails.length;f++){
          ///console.log("folderDetails[f]:");
          //console.log(folderDetails[f]);
          FileModel.find({
            _id: {$in: fileIds}//folderDetails[f].hasFiles}
          })
            .then(filesDetails => {
              let message;
              if (filesDetails.length === 0) {
                message = 'Folder has no files';
                console.log(message);
              } else {
                for(let k=0;k<folderDetails.length;k++) {
                  console.log("folderDetails[k]",folderDetails[k]);
                  console.log("fileDetails: ",filesDetails)
                  const filesIdsArray=folderDetails[k].hasFiles;
                  console.log("folderDetails[k].hasFiles: ",folderDetails[k].hasFiles);
                  console.log("fileIds:",filesIdsArray);
                  for (let i = 0; i < filesIdsArray.length; i++) {
                    const file= getFileDetails(filesIdsArray[i],filesDetails);
                    console.log("file: ",file);
                      let lastDotPos = file.title.lastIndexOf('.');
                      const ext = file.title.substr(lastDotPos + 1, file.title.length - lastDotPos);
                      if (!extensions.includes(ext)) {
                        extensions.push(ext);
                      }
                      for (let j = 0; j < extensions.length; j++) {
                        let files = [];
                        for (let i = 0; i < filesDetails.length; i++) {
                          let lastDotPos = file.title.lastIndexOf('.');
                          const ext = file.title.substr(lastDotPos + 1, file.title.length - lastDotPos);
                          if (ext === extensions[j]) {
                            files.push(file.title);
                          }
                          console.log("files: ", files);
                          sortedFiles.push({fileType: extensions[j], files: files});
                          console.log("sortedFiles:", sortedFiles);
                        }
                      }
                      console.log("before: ");
                      console.log(folderDetails[k])
                      folderDetails[k].files = sortedFiles;
                      console.log("after: ");
                      console.log(folderDetails[k])
                    }
                  }
                }
              console.log("before sending the results : ",folderDetails)
              message = 'All files were found'
              res.status(200).json({
                message: message,
                folders: folderDetails
              });

            })
       // }

      }

    })

}
function getFileDetails(fileId, filesArray){
  for(let i=0;i<filesArray.length;i++){
    console.log(filesArray[i]._id,fileId)
    if(filesArray[i]._id.toString()===fileId.toString()){
      return filesArray[i];
    }
  }
}
module.exports = router;

