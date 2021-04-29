import * as core from '@actions/core';
import { pullInputs } from './utils';
import { WorkflowHandler } from './Workflow.class';

async function run() {
  try {
    const { token, workflowRef, inputs, ref, owner, repo } = pullInputs();

    const workflowHandler = new WorkflowHandler(token, workflowRef, owner, repo, ref);

    // Trigger workflow run
    console.log(`Starting Workflow Dispatch 🚀`);
    const disaptchEvent = await workflowHandler.triggerWorkflow(inputs);
    console.log('disaptchEvent', disaptchEvent);
    if (disaptchEvent.status === 204) console.log('Workflow Dispatch Successful');
  } catch (error) {
    core.setFailed(error.message);
    core.debug(error.stack);
  }
}

exports = run;

run();
