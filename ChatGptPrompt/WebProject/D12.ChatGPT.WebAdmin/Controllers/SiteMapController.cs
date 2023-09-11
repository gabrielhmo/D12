using HermosilloOnlineLib;
using HermosilloOnlineLib.Dhtmlx;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using D12.ChatGPT.WebAdmin.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [RouteArea("Security")]
    [RoutePrefix("SiteMap")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrator")]
    [Authorize]
    public class SiteMapController : Controller
    {
        private const string SiteMapName = "SiteMap";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());

        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;

        public SiteMapController()
        {
            var currentUser = System.Web.HttpContext.Current.User;
            siteMapRolPolicyDTO = unitWork.SiteMapPolicies.GetPolicyBySiteMapByUser(currentUser.Identity.GetUserId(), SiteMapName);
            //Set if user is ReadOnly
            isReadOnly = (siteMapRolPolicyDTO.Write == false);

            if (currentUser.IsInRole("Administrator"))
                isReadOnly = false;
        }


        [HttpGet]
        public ActionResult InitTree()
        {
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxTree sitemapTree = new DhxTree();

            IEnumerable<SiteMapAccessPoliciesDTO> siteMapAccessPolicies = unitWork.SiteMapAccessPolicies.LoadBySiteMapId();

            try
            {
                if (siteMapAccessPolicies.Count() > 0)
                {
                    sitemapTree = GetDhxTree(siteMapAccessPolicies);
                }

            }
            catch (Exception ex)
            {
                jsonData.Result = false;
                jsonData.Title = "Error: Inesperado";
                jsonData.Message = ex.Message.ToString();
                jsonData.Action = "error";
            }

            JsonNetResult jsonReturn = new JsonNetResult
            {
                Formatting = Formatting.Indented,
                //Change properties name to lower
                SerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    NullValueHandling = NullValueHandling.Ignore
                },

                Data = sitemapTree
            };

            return jsonReturn;
        }

        [HttpGet]
        public ActionResult Permisos()
        {
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            var rolesList = unitWork.Rol.GetAll();

            foreach (AspNetRoles UsersItem in rolesList)
            {
                string iconAddNew = string.Empty;

                DhxRows newRow = new DhxRows
                {
                    Id = UsersItem.Id.ToString()
                };

                newRow.Data.Add("");
                newRow.Data.Add(UsersItem.Id.ToString());
                newRow.Data.Add(UsersItem.Name.ToString());
                newRow.Data.Add("");
                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            return new JsonNetResult { Data = dhxGridData };

        }

        [HttpPost]
        public JsonNetResult UpdatePolicies(UpdatePoliciesViewModel requestUpdatePolicies)
        {
            JsonData jsonData = new JsonData();

            if (isReadOnly)
            {
                jsonData.Errors.Add(new ExceptionInfo
                {
                    Result = false,
                    ErrorType = ErrorType.NONE,
                    Status = Status.Error,
                    MessageTitle = "Access denied",
                    Message = "User only has read permission"
                });
            }
            else
            {
                if (String.IsNullOrWhiteSpace(requestUpdatePolicies.RolId))
                {
                    jsonData.Errors.Add(new ExceptionInfo
                    {
                        Result = false,
                        ErrorType = ErrorType.NONE,
                        Status = Status.Error,
                        MessageTitle = "Solicitud incorrecta",
                        Message = "No se proporcionó la información requerida para la operación"
                    });
                }
                else
                {
                    foreach (var siteMapId in requestUpdatePolicies.SiteMapId)
                    {
                        SiteMapPolicies siteMapPolicies = unitWork.SiteMapPolicies
                            .GetPolicyBySiteMapIdRoleId(siteMapId, requestUpdatePolicies.RolId);

                        if (siteMapPolicies == null)
                        {
                            unitWork.SiteMapPolicies.Add(new SiteMapPolicies
                            {
                                SiteMapId = siteMapId,
                                RolId = requestUpdatePolicies.RolId,
                                Read = requestUpdatePolicies.Read,
                                Write = requestUpdatePolicies.Write
                            });

                            siteMapPolicies = new SiteMapPolicies();
                        }
                        else
                        {
                            if (siteMapId > 0 && !string.IsNullOrWhiteSpace(requestUpdatePolicies.RolId))
                            {
                                siteMapPolicies.Read = requestUpdatePolicies.Read;
                                siteMapPolicies.Write = requestUpdatePolicies.Write;
                            }
                        }
                    }

                    unitWork.Complete();
                }
            }

            if (jsonData.Errors.Count > 0)
            {
                jsonData.Result = false;
                jsonData.MessageType = ResultType.Error;
                jsonData.Title = "No se guardó información";
                jsonData.Message = "Se produjo un error al intentar guardar los datos.";
            }
            else
            {
                jsonData.Result = true;
                jsonData.MessageType = ResultType.Success;
                jsonData.Title = "Done..!";
                jsonData.Message = "The information was saved successfully.";;
            }


            return new JsonNetResult { Data = jsonData };
        }

        private static DhxTree GetDhxTree(IEnumerable<SiteMapAccessPoliciesDTO> siteMapItem)
        {
            DhxTree tree = new DhxTree { Id = "0" };

            AddDhxTreeNode(tree, siteMapItem);

            return tree;
        }

        private static DhxTree AddDhxTreeNode(DhxTree dhxTree, IEnumerable<SiteMapAccessPoliciesDTO> siteMapItem)
        {
            List<SiteMapAccessPoliciesDTO> current = siteMapItem.Where(o => o.ParentId.ToString() == dhxTree.Id).OrderBy(o => o.Index).ToList();

            if (dhxTree.Id != "0")
            {
                if (current.Count > 0)
                    dhxTree.Child = "1";
                else
                    dhxTree.Child = "0";
            }

            foreach (SiteMapAccessPoliciesDTO item in current)
            {
                string active = "1";

                if (!item.Active)
                    active = "";

                List<object> userData = new List<object>();
                //List<object> permisos = new List<object>();

                //permisos.Add(item.PoliciesAccess);

                userData.Add(new { name = item.Id.ToString(), content = item.PoliciesAccess });

                DhxTree child = new DhxTree
                {
                    Id = item.Id.ToString(),
                    Text = item.Name,
                    Tooltip = item.Name,
                    Checked = active,
                    userdata = userData
                };
                dhxTree.Item.Add(child);
                AddDhxTreeNode(child, siteMapItem);
            }
            return dhxTree;
        }

    }
}