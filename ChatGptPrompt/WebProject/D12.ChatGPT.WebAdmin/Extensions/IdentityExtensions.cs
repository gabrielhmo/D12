using System;
using System.Security.Claims;
using System.Security.Principal;

namespace D12.ChatGPT.WebAdmin.Extension
{
    public static class IdentityExtensions
    {
        public static string GetScreenName(this IIdentity identity)
        {
            var firstName = ((ClaimsIdentity)identity).FindFirst("FirstName");
            var lastName = ((ClaimsIdentity)identity).FindFirst("LastName");

            string screenName = String.Concat(firstName?.Value, " ", lastName?.Value.Substring(0, 1).ToUpper(), ".");

            // Test for null to avoid issues during local testing
            return screenName ?? string.Empty;
        }
        public static string GetFirstName(this IIdentity identity)
        {
            var firstName = ((ClaimsIdentity)identity).FindFirst("FirstName");
            // Test for null to avoid issues during local testing
            return (firstName != null) ? firstName.Value : string.Empty;
        }
        public static string GetLastName(this IIdentity identity)
        {
            var lastName = ((ClaimsIdentity)identity).FindFirst("LasttName");
            // Test for null to avoid issues during local testing
            return (lastName != null) ? lastName.Value : string.Empty;
        }
        public static string GetLastAccess(this IIdentity identity)
        {
            var lastAcces = ((ClaimsIdentity)identity).FindFirst("LastAccess");
            // Test for null to avoid issues during local testing
            return (lastAcces != null) ? lastAcces.Value : string.Empty;
        }
    }
}