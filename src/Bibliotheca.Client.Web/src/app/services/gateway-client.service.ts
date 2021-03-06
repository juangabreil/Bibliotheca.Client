import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, ResponseContentType } from '@angular/http';
import { Project } from '../entities/project'
import { User } from '../entities/user'
import { Group } from '../entities/group';

@Injectable()
export class GatewayClientService {

    constructor(private httpClient: HttpClientService) {
    }

    public getGraphQLResults(query: string) : Observable<Response> {
        return this.httpClient.post("/api/graphql", query);
    }

    public getProjects() : Observable<Response> {
        return this.httpClient.get('/api/projects');
    }

    public getProjectsWithKeywords(query: string) : Observable<Response> {
        return this.httpClient.get("/api/projects?query=" + query);
    }

    public getFilteredProjects(selectedGroup: string, selectedTags: string[]) : Observable<Response> {
        var groupfilter = "";
        if(selectedGroup) {
            groupfilter = "?groups=" + selectedGroup;
        }

        var tagsFilter = "";
        if(selectedTags && selectedTags.length > 0) {
            var separator = "&";
            if(groupfilter == "") {
                separator = "?";
            }

            for(let selectedtag of selectedTags) {
                tagsFilter +=  separator + "tags=" + selectedtag;
                separator = "&";
            }
        }

        return this.httpClient.get('/api/projects' + groupfilter + tagsFilter);
    }

    public getProject(projectId: string) : Observable<Response> {
        return this.httpClient.get('/api/projects/' + projectId);
    }

    public getProjectAccessToken(projectId: string) : Observable<Response> {
        return this.httpClient.get("/api/projects/" + projectId + "/accessToken");
    }

    public createProject(project: Project) : Observable<Response> {
        return this.httpClient.post("/api/projects", project);
    }

    public updateProject(projectId: string, project: Project) : Observable<Response> {
        return this.httpClient.put("/api/projects/" + projectId, project);
    }

    public deleteProject(projectId: string) : Observable<Response> {
        return this.httpClient.delete("/api/projects/" + projectId);
    }

    public getBranches(projectId: string) : Observable<Response> {
        return this.httpClient.get('/api/projects/' + projectId + '/branches');
    }

    public getLogs(projectId: string) : Observable<Response> {
        return this.httpClient.get('/api/logs/' + projectId);
    }

    public getBranch(projectId: string, branchName: string) : Observable<Response> {
        return this.httpClient.get('/api/projects/' + projectId + '/branches/' + branchName);
    }

    public deleteBranch(projectId: string, branchName: string) : Observable<Response> {
        return this.httpClient.delete("/api/projects/" + projectId + '/branches/' + branchName);
    }

    public getUsers() : Observable<Response> {
        return this.httpClient.get('/api/users');
    }

    public getUser(userId: string) : Observable<Response> {
        return this.httpClient.get('/api/users/' + userId);
    }

    public createUser(user: User) : Observable<Response> {
        return this.httpClient.post("/api/users", user);
    }

    public updateUser(userId: string, user: User) : Observable<Response> {
        return this.httpClient.put("/api/users/" + userId, user);
    }

    public deleteUser(userId: string) : Observable<Response> {
        return this.httpClient.delete("/api/users/" + userId);
    }

    public refreshUserToken(userId: string, accessToken: string) : Observable<Response> {
        return this.httpClient.put("/api/users/" + userId + "/refreshToken", { accessToken: accessToken });
    }

    public getTableOfContents(projectId: string, branchName: string) : Observable<Response>{
        return this.httpClient.get('/api/projects/' + projectId + '/branches/' + branchName + '/toc');
    }

    public searchInBranch(projectId: string, branchName: string, query: string) : Observable<Response> {
        return this.httpClient.get("/api/search/projects/" + projectId + "/branches/" + branchName + "?query=" + query);
    }

    public getDocumentContent(projectId: string, branchName: string, fileUri: string) : Observable<Response> {
        return this.httpClient.get('/api/projects/' + projectId + '/branches/' + branchName + '/documents/content/' + fileUri);
    }

    public getGroups() : Observable<Response> {
        return this.httpClient.get('/api/groups');
    }

    public getGroup(name: string) : Observable<Response> {
        return this.httpClient.get('/api/groups/' + name);
    }

    public deleteGroup(name: string) : Observable<Response> {
        return this.httpClient.delete("/api/groups/" + name);
    }

    public updateGroup(name: string, group: Group) : Observable<Response> {
        return this.httpClient.put('/api/groups/' + name, group);
    }

    public createGroup(group: Group) : Observable<Response> {
        return this.httpClient.post('/api/groups', group);
    }

    public getTags() : Observable<Response> {
        return this.httpClient.get('/api/tags');
    }

    public getServices() : Observable<Response> {
        return this.httpClient.get('/api/services');
    }

    public getServiceHealth(serviceId: string) : Observable<Response> {
        return this.httpClient.get("/api/services/" + serviceId + "/current-health");
    }

    public search(query: string) : Observable<Response>  {
        return this.httpClient.get("/api/search?query=" + query);
    }

    public searchIsEnabled() : Observable<Response>  {
        return this.httpClient.get("/api/search/isEnabled");
    }

    public reindexBranch(projectId: string, branchName: string) : Observable<Response> {
        return this.httpClient.post("/api/search/projects/" + projectId + "/branches/" + branchName + "/refresh", null);
    }

    public getReindexStatus(projectId: string, branchName: string) : Observable<Response> {
        return this.httpClient.get("/api/search/projects/" + projectId + "/branches/" + branchName + "/status");
    }

    public getPdfFile(projectId: string, branchName: string) : Observable<Response> {
        return this.httpClient.get('/api/projects/' + projectId + '/branches/' + branchName + '/export/pdf', {
            responseType: ResponseContentType.Blob
        });
    }

    public getPathToImage(projectId: string, branchName: string, fullPath: string) : string {
        return "src=\"" + this.httpClient.serverAddress + "/api/projects/" + projectId + "/branches/" + branchName + "/documents/content/" + fullPath + "?access_token=" + localStorage["adal.idtoken"] + "\"";
    }
}