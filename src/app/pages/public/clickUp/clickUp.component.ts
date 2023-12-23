import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { envClickUp } from '../../../../environments/environment';
import { DateToolsService } from '../../../services/dateTools.service';
import { firstValueFrom, tap } from 'rxjs';

@Component({
    selector: 'app-click-up',
    templateUrl: './clickUp.component.html',
    styleUrl: './clickUp.component.css',
    //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickUpComponent { 
    activeTab = 1;
    loadingSpinner = false;

    clickUpFolders: any;
    projects: any[] = [];
    projEmAndamento: any[] = [];
    projConcluido: any[] = [];

    constructor(
        private _apiService: ApiService,
        private _dateTools: DateToolsService
    ) {}

    async ngOnInit() {
        this.getClickUpData();
    }

    getClickUpData() {
        this.loadingSpinner = true;
        this._apiService
            .get(envClickUp.folders)
            .subscribe({
                next: (data: any) => {
                    this.loadingSpinner = false;
                    this.clickUpFolders = data;
                    this.iterableFolderProjectsToList(data);
                    console.log(data);
                },
                error: error => {
                    this.loadingSpinner = false;
                    console.log(error);
                }
            });
    }

    async iterableFolderProjectsToList(folders: any) {
        this.projects = [];
        if (folders.folders) {
            this.loadingSpinner = true;
            const folderPromises = folders.folders.map(async (folder: { id: any; name: any; lists: any[]; }) => {
                let project = {
                    id: folder.id,
                    name: folder.name,
                    lists: [] as any[]
                };
                let tasksPromises = folder.lists.map(async (list: { id: any; name: any; status: any; start_date: null; due_date: null; }) => {
                    try {
                        const tasks: any = await firstValueFrom(
                            this._apiService.get(
                                `list/${list.id}/task`, 
                                {
                                    'include_closed': true,
                                    'subtasks': true,
                                    'order_by': 'created'
                                }
                            ));
                        return {
                            id: list.id,
                            name: list.name,
                            type: folder.name,
                            status: list.status,
                            start_date:  list.start_date != null ? this._dateTools.formatDate(Number(list.start_date)) : '',
                            due_date: list.due_date != null ? this._dateTools.formatDate(Number(list.due_date)) : '',
                            statusTasks: this.calculateCompletedTasksPercentage(tasks)
                        };
                    } catch (error) {
                        console.log(error);
                        return null; // Retorne um valor padrão ou rejeite a promessa
                    }
                });
                project.lists = await Promise.all(tasksPromises);
                return project;
            });
            this.projects = await Promise.all(folderPromises);
            this.sortAndSeparateProjects(this.projects);
            this.loadingSpinner = false;
        }
    }

    sortAndSeparateProjects(projects: any[]) {
        if (projects && projects.length > 0) {
            let lists = [...projects[0].lists, ...projects[1].lists];

            // Ordenar por data
            //lists.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
            // lists.sort((a, b) => {
            //     let dateA = new Date(a.start_date);
            //     let dateB = new Date(b.start_date);
            //     return dateA.getTime() - dateB.getTime();
            // });
            lists.sort(this._dateTools.sortByStart_date)
            // Separar por tipo
            let notConcludedProjects = lists.filter(task => task.status.status !== 'concluido' && task.status.status !== 'concluido atraso');
            let concludedProjects = lists.filter(task => task.status.status === 'concluido' || task.status.status === 'concluido atraso');

            console.log(this.projEmAndamento);
            this.projEmAndamento = notConcludedProjects;
            this.projConcluido = concludedProjects;
        }
    }

    calculateCompletedTasksPercentage(tasks: any): object | null {
        if (tasks.tasks){
            tasks = tasks.tasks;
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter((task: { status: { type: string; }; }) => task.status.type == 'closed').length;
            const percentage = (totalTasks > 0) ? parseFloat(((completedTasks / totalTasks) * 100).toFixed(0)).toString() : '0';
            return {percentage, completedTasks, totalTasks};
        }
        return {percentage: "0", completedTasks: 0, totalTasks: 0};
    }
}
