import anim from 'animejs';

/**
 * @param {string | Node | Node[]} targets
 * @param {anim.AnimeParams} params
 * @return {anim.AnimeInstance}
 */
function animation(targets, params) {
  return anim({
    targets,
    easing: 'linear',
    ...params,
  });
}

animation.remove = anim.remove;
animation.timeline = anim.timeline;
animation.stagger = anim.stagger;

export default animation;
